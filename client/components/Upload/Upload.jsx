import React from 'react';

const Upload = () => {
  return (
    <div>
      <form id="uploadImage" encType="multipart/form-data" method="POST" action="/products/images" target="formDestination">
        <input id="fileupload" name="fileUpload" type="file" />
        <input type="submit" value="submit" id="submit" />
      </form>
      <iframe name="formDestination"></iframe>
    </div>
  )
}

export default Upload;