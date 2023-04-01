// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../layouts/sidebar.css'
import * as React from 'react';
import { Avatar } from '@mui/material';

// const options = [
//   'lecture1',
//   'lecture2',
//   'lecture3',
//   'lecture4',
//   'lecture5',
//   'lecture6',
// ];

// const ITEM_HEIGHT = 48;

// function LongMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <IconButton
//         aria-label="more"
//         id="long-button"
//         aria-controls={open ? 'long-menu' : undefined}
//         aria-expanded={open ? 'true' : undefined}
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id="long-menu"
//         MenuListProps={{
//           'aria-labelledby': 'long-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           style: {
//             maxHeight: ITEM_HEIGHT * 4.5,
//             width: '20ch',
//           },
//         }}
//       >
//         {options.map((option) => (
//           <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
//             {option}
//           </MenuItem>
//         ))}
//       </Menu>
//     </div>
//   );
// }

export default function Sidebar({newUser, onCourseClick}){
  //数据处理
  const courses1 = Object.values(newUser);
  const courses2 = Object.values(courses1)[0];
  const courses3 = Object.values(courses2)[0];
  const courses4 = Object.values(courses3);
  const avatar = Object.values(courses4[5]);
  const courses = Object.entries(courses4[4]);
  const userName = Object.values(courses4[1]);

  return(
    <div>
      <div className='sidebar'>
        <div className='avatar'>
        <Avatar>{avatar}</Avatar>
        </div>
        {userName}
        <ul className='course-menu'>
          {courses.map((course)=>
            <li key={course[0]} className='list-item'>
              {/* <a href="/">{course[1]}</a>  */}
              <button onClick={() => onCourseClick(course[1])}>{course[1]}</button>
              {/* <div className="long-menu">
                <LongMenu/>
              </div> */}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}