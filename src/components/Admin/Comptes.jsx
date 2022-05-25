import React , {useState,useEffect} from 'react';
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';
 import Checkbox from '@mui/material/Checkbox';

 const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));
  
      let  STATUSES = ['Avocat', 'Juge'];

function Comptes() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [data, setData] = useState([]);

    // GET request function to your Mock API
    const fetchInventory = () => {
        fetch("http://localhost:4000/users/get")
            .then(res => res.json())
            .then(json => setData(json));
    }
    
    // Calling the function on component mount
    useEffect(() => {
        fetchInventory();
    }, []); 

    const selectShortlistedApplicant = (e) => {
      const checked = e.target.checked;
      if (checked)  {
        Swal.fire({
          icon: 'succes',
          text: 'Compte validé !',
        })
      }
    };
 
  return (
    <div>   
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Nom et Prénom </TableCell>
            <TableCell className={classes.tableHeaderCell}>Email</TableCell>
            <TableCell className={classes.tableHeaderCell}>Poste</TableCell>

            <TableCell className={classes.tableHeaderCell}>Validation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.firstname}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={row.name} src='.' className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{row.firstname} <a> </a>{row.lastname}</Typography>
                         
                        
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{row.Emailaddress}</Typography>
                
                </TableCell>
              <TableCell>
                  <Typography 
                    className={classes.poste}
                   /* style={{
                        backgroundColor: 
                        ((row.poste === 'juge' && 'green') ||
                        (row.poste === 'avocat' && 'blue') 
                        )
                    }}    */
                  >    {row.poste}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography >   <Checkbox {...label} color="success" 
                  onClick={(e) => { selectShortlistedApplicant(e); }}
                  /></Typography>
                
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer> </div>
  );
}

export default Comptes;











