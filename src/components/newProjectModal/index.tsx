import React, { SyntheticEvent } from 'react';

type ModalProps = {
  nameUpdate: (name: string) => void;
};

const NewProjectModal = ({ nameUpdate }: ModalProps): JSX.Element => {
  function handleNewProjSubmission(e: SyntheticEvent) {
    e.preventDefault();
    // props. ({
    //   projectName: e.target.projectName.value;
    // })
  }

  return (
    <>
      {/* <form> */}
      <input
        type="text"
        name="projectName"
        placeholder="Project Name"
        onChange={(e) => nameUpdate(e.target.value)}
      />
      <button type="submit">Start</button>
      {/* </form> */}
    </>
  );
};

NewProjectModal.propTypes = {};

export default NewProjectModal;
