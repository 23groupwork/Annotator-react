import '../layouts/sidebar.css'
import * as React from 'react';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AddIcon from '@mui/icons-material/Add';
import BadgeIcon from '@mui/icons-material/Badge';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ForumIcon from '@mui/icons-material/Forum';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';

function PersonInfo({roleType}){
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleMessageClick = () => {
    
  };
  if(roleType==="Student"){
  return(
    <List
    sx={{ width: '100%', maxWidth: 360, bgcolor: 'whitesmoke' }}
    component="nav">
    <ListItemButton onClick={handleClick}>
      <BadgeIcon fontSize='small'/>
      <ListItemText primary="Account" style={{textAlign: 'center'}}/>
        {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{pl:4}} onClick={handleMessageClick}>
            <NotificationsActiveIcon fontSize='small'/>
            <ListItemText primary="Message" style={{textAlign: 'center'}}/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <AutoAwesomeIcon fontSize='small'/>
            <ListItemText primary="Starred" style={{textAlign: 'center'}}/>
          </ListItemButton>
          <ListItemButton sx={{pl:4}}>
            <ForumIcon fontSize='small'/>
            <ListItemText primary="Comment" style={{textAlign: 'center'}}/>
          </ListItemButton>
        </List>
      </Collapse>
  </List>
  );
  } else {
  return(
    <List
    sx={{ width: '100%', maxWidth: 360, bgcolor: 'whitesmoke' }}
    component="nav">
    <ListItemButton onClick={handleClick}>
      <BadgeIcon fontSize='small'/>
      <ListItemText primary="Account" style={{textAlign: 'center'}}/>
        {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{pl:4}}>
            <NotificationsActiveIcon fontSize='small'/>
            <ListItemText primary="Message" style={{textAlign: 'center'}}/>
          </ListItemButton>
          <ListItemButton sx={{pl:4}}>
            <AddIcon fontSize='small'/>
            <ListItemText primary="Release" style={{textAlign: 'center'}}/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <AutoAwesomeIcon fontSize='small'/>
            <ListItemText primary="Starred" style={{textAlign: 'center'}}/>
          </ListItemButton>
          <ListItemButton sx={{pl:4}}>
            <ForumIcon fontSize='small'/>
            <ListItemText primary="Comment" style={{textAlign: 'center'}}/>
          </ListItemButton>
        </List>
      </Collapse>
  </List>
  );
  }
}

export default function Sidebar({newUser, onCourseClick}){
  //数据处理
  const avatar = Object.values(newUser.avatar);
  const courses = Object.entries(newUser.courses);
  const userName = Object.values(newUser.userName);
  const roleType = newUser.roleType;

  return(
    <div>
      <div className='sidebar'>
        <div className='avatar'>
        <Avatar>{avatar}</Avatar>
        </div>
        <p>{userName}</p>
        <PersonInfo roleType={roleType}/>
        <ul className='course-menu'>
          {courses.map((course)=>
            <li key={course[0]} className='list-item'>
              <button onClick={() => onCourseClick(course[1])}>{course[1]}</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}