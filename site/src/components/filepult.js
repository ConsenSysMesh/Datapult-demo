import React, {useEffect, useState, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios'
import FormData from 'form-data';
import Upload from "../images/upload.png"

axios.defaults.baseURL = process.env.API_ROOT || "https://card.datapult.site";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#ccc',
  borderStyle: 'dashed',
  backgroundColor: '#1C1A1B',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: '100%',
  maxWidth: '500px',
  imageOrientation: 'from-image',
};

const FileDrop = (props) => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('')
  const [descr, setDescr] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [status, setStatus] = useState('')
  const [inProcess, setInProcess] = useState(false)

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    multiple: false,
    maxSize: 10000000,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const thumbs = files.map(file => (
    <div>
      <div>
        <p className="font-bold">Sharing Preview</p>
        </div>
      <div style={thumbsContainer}>
        <div style={thumb} key={file.name}>
          <div style={thumbInner} className="relative">
            <div className="w-full absolute top-0 left-0 bg-gradient-to-b from-white rounded-tl-lg rounded-tr-lg pb-10">
              <div className="text-gray-700 text-lg font-bold mx-2">{title}</div>
              <div className="text-gray-700 text-md italic mx-2">{descr}</div>
            </div>
            <img
              alt={descr}
              title={title}
              src={file.preview}
              style={img}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const submitForm = async (e) => {
    e.preventDefault();

    const form = new FormData();
    console.log('Reading file and uploading...')
    setStatus('Uploading file...');
    setInProcess(true);

    form.append('file', files[0], files[0].name);
    form.append('title', title);
    form.append('descr', descr);

    const response = await axios.post('/upload', form );

    if (response.status === 200) {
      setShareUrl(response.data.shareUrl);
      setStatus('Success!');
    }
    else {
      setStatus('ERROR');
    }

    console.log('Upload of image');
    console.log(`result: ${response.status} ${response.statusText}`);
    console.log('response:', response.data);
  }

  return (
    <section>
      <form onSubmit={submitForm}>
        { files.length === 0 &&
        <div {...getRootProps({style})} className="p-2 h-80 w-80">
          <input {...getInputProps()} />
          <img className="w-8 pt-8" src={Upload} alt="upload icon"/>
          <p className="p-3 text-center">Drag 'n' drop an image here</p>
          <p className="text-center"><span className="underline">or click/tap here to select a file</span></p>
          <p>Max size 10MB.</p>
        </div>
        }
        { files.length === 1 && shareUrl === '' &&
          <>
            <div className="py-2">
              <input
                type="text"
                id="title"
                placeholder="Provide a title (optional)"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
                className="w-full md:w-3/4 ml-2 text-gray-800"
              />
            </div>
            <div className="py-2">
              <input
                type="text"
                id="descr"
                placeholder="Provide a description (optional)"
                name="descr"
                value={descr}
                onChange={(e) => {
                  setDescr(e.target.value)
                }}
                className="w-full md:w-3/4 ml-2 text-gray-800"
              />
            </div>
              <div className="p-2">
                <button
                  className={`text-white text-xl font-bold py-3 px-5 rounded ${inProcess ? "bg-gray-400" : "bg-orange-700" }`}
                  type="submit"
                  disabled={inProcess}
                  >
                  pult it!
                </button>
                { status !== '' &&
                  <div>{status}</div>
                }
              </div>
            <div>
              {thumbs}
            </div>

          </>
      }
      { shareUrl !== '' &&
        <div className="text-xl font-bold p-3 bg-slate-800 rounded funky">
          Your file has been &#39;pulted! Now share it! <br/> <a target="_blank" rel="noreferrer" className="underline text-blue-700 hover:text-blue-400" href={shareUrl}>{shareUrl}</a>
        </div>
       }
      </form>

    </section>
  )
}

export default FileDrop;
