import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TitleDescription = ({ title, setTitle, description, setDescription }) => {
  return (
    <div className="title-description-container">
      <div
        className="editable"
        contentEditable
        data-placeholder="Challenge Title"
        onInput={(e) => setTitle(e.currentTarget.textContent)}
        style={{ fontWeight: 'bold' }}
      >
        {title}
      </div>
      <ReactQuill
        value={description}
        onChange={setDescription}
        placeholder="Challenge Description"
        modules={{
          toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'},
             {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
          ],
          clipboard: {
            matchVisual: false,
          }
        }}
        formats={[
          'header', 'font', 'size',
          'bold', 'italic', 'underline', 'strike', 'blockquote',
          'list', 'bullet', 'indent',
          'link', 'image', 'video'
        ]}
        className="description-editor"
      />
    </div>
  );
};

export default TitleDescription;
