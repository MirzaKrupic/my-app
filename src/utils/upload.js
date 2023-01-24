import React from "react";
import S3 from "react-aws-s3";
window.Buffer = window.Buffer || require("buffer").Buffer; 
function Upload() {
  const fileInput = React.useRef();

  const config = {
    bucketName: process.env.BUCKET_NAME,
    dirName: `user/${user_id}/checklist/${checklist_id}`,
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    s3Url: process.env.S3URL, /* without the suffix zone added */
  };

  const handleClick = (event) => {
    event.preventDefault();
    let newArr = fileInput.current.files;
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i]);
    }
  };

  const handleUpload = (file) => {
    let newFileName = file.name.replace(/\..+$/, "");
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      if (data.status === 204) {
        console.log("success");
      } else {
        console.log("fail");
      }
    });
  };

  return (
    <>
      <form className='upload-steps' onSubmit={handleClick}>
        <label>
          Upload file:
          <input type='file' multiple ref={fileInput} />
        </label>
        <br />
        <button type='submit'>Upload</button>
      </form>
    </>
  );
}
export default Upload;
