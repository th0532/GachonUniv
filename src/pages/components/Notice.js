// import React,{useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
// import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableRow from '@material-ui/core/TableRow';
// // import IconButton from '@material-ui/core/IconButton';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import TableHead from '@material-ui/core/TableHead';
// import "./css/Notice.css"   

// //공지사항 테이블 상단 제목 작성자 작성일의 배경색, 글자색 및 테이블 폰트 크기 지정
// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.info.light,
//     color: theme.palette.common.white,
//   },
// }))(TableCell);

// const useStyles1 = makeStyles((theme) => ({
//   root: {
//     flexShrink: 0,
//     marginLeft: theme.spacing(0),
//   },
// }));

// function TablePaginationActions(props) {
//   const classes = useStyles1();
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onChangePage } = props;

//   const handleBackButtonClick = (event) => {
//     onChangePage(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onChangePage(event, page + 1);
//   };


//   return (
//     <div className={classes.root}>
//       {/* <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton> */}
//     </div>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onChangePage: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

// const useStyles2 = makeStyles({
//   table: {
//     minWidth: 480,
//   },
// });

// export default function CustomPaginationActionsTable() {
//   const classes = useStyles2();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const [noticeData, setNoticeData] = useState(['']);

//   const fetchApi = async() =>{
//     await fetch("http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:5000/notice")
//       .then((response) =>{
//         if(response.status === 200){
//           response.json()
//           .then(data => {
//             setNoticeData(data.notice)
//           })
//         }
//         else{
//           console.log("server error")
//         }
//       }      
//   )}

//   useEffect(() => {
//     fetchApi();
//   }, [])
  
//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.length - page * rowsPerPage);
  
//   return (
//       <TableContainer>
//         <h2>공지사항</h2>
//         <Table className={classes.table} aria-label="custom pagination table">
//           <TableHead>
//             <TableRow>
//             <StyledTableCell align="center">번호</StyledTableCell>
//               <StyledTableCell align="center">제목</StyledTableCell>
//               <StyledTableCell align="center">작성자</StyledTableCell>
//               <StyledTableCell align="center">작성일</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {(rowsPerPage > 0
//               ? fetchApi.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               : fetchApi
//             ).map((row) => (
//               <TableRow key={row.index}>
//                 <TableCell style={{ width: 30 }} align="center">
//                   {row.index}
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                   {row.title}
//                 </TableCell>
//                 <TableCell style={{ width: 80 }} align="center">
//                   {row.writer}
//                 </TableCell>
//                 <TableCell style={{ width: 80 }} align="center">
//                   {row.time}
//                 </TableCell>
//               </TableRow>
//             ))}

//             {emptyRows > 0 && (
//               <TableRow style={{ height: 53 * emptyRows }}>
//                 <TableCell colSpan={6} />
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//   );
// }