import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import * as selectors from '../../store/selectors';
import {
  DropDownContent,
  DropDownHeader,
  DropDownHeaderContainer,
  DropDownContainer,
  DropDownList,
  DropDownText,
  DropdownWrapper,
  Text,
  Freeze,
} from './styles';
import { getProjectById } from '../../store/slices/projectSlice/thunks';

type DropdownProps = {
  isOpen: boolean;
  handleToggleDropdown: () => void;
};

const Dropdown = ({ isOpen, handleToggleDropdown }: DropdownProps): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const projectList = useSelector(selectors.selectProjectList);

  const handleProjectSelect = (id: string) => {
    dispatch(getProjectById(id));
    history.push('/project');
  };

  const handleClick = (id: string) => {
    handleProjectSelect(id);
    handleToggleDropdown();
  };

  const projects: JSX.Element[] = projectList.map((e) => {
    const startDate = dayjs(e.startDate).format('MM/DD/YYYY');
    const endDate = dayjs(e.endDate).format('MM/DD/YYYY');
    return (
      <DropDownContainer onClick={() => handleClick(e.id)}>
        <DropDownText marginL="21px" marginR="auto" width="523px">
          {e.projectName}
        </DropDownText>
        <DropDownText marginL="22px" marginR="auto" width="100px">
          {startDate}
        </DropDownText>
        <DropDownText marginL="95px" marginR="auto" width="100px">
          {endDate}
        </DropDownText>
      </DropDownContainer>
    );
  });

  return (
    <div>
      <DropDownContent isOpen={isOpen}>
        <DropdownWrapper>
          {projectList.length !== 0 ? (
            <>
              <DropDownHeaderContainer>
                <DropDownHeader margin="110px">Project</DropDownHeader>
                <DropDownHeader margin="497px">Start Date</DropDownHeader>
                <DropDownHeader margin="112px">End Date</DropDownHeader>
              </DropDownHeaderContainer>
              <DropDownList>{projects}</DropDownList>
            </>
          ) : (
            <>
              <Text margin="100px">Please Add a New Project</Text>
              <Freeze />
            </>
          )}
        </DropdownWrapper>
      </DropDownContent>
    </div>
  );
};

export default Dropdown;
