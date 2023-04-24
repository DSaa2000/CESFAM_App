import * as React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const lista = [
    { id: '#000001', title: 'Medicamento 1'},
    { id: '#000002', title: 'Medicamento 2'},
    { id: '#000003', title: 'Medicamento 3'},
    { id: '#000004', title: 'Medicamento 4'},
    { id: '#000005', title: 'Medicamento 5'},
    { id: '#000006', title: 'Medicamento 6'},
    { id: '#000007', title: 'Medicamento 7'},
    { id: '#000008', title: 'Medicamento 8'},
    { id: '#000009', title: 'Medicamento 9'},
    { id: '#0000010', title: 'Medicamento 10'},
    { id: '#0000011', title: 'Medicamento 11'},
    { id: '#0000012', title: 'Medicamento 12'},
];
const listItems = lista.map((item) =>
    <ListItemButton>
        <Card sx={{ minWidth: 275 }} style={{margin: '0', padding: '1px', width: '100%'}}>
            <CardContent style={{margin: '0', padding: '10px'}}>
                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                    {item.id.toString()} 
                </Typography>
                <Typography sx={{ fontSize: 16 }}  component="div">
                    {item.title.toString()} 
                </Typography>
            </CardContent>
        </Card>
    </ListItemButton>
);
  
const ListadoInventario = () => {
    
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paperblue' }} aria-label="contacts">
                {listItems}                
            </List>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </Box>
    );
}
export default ListadoInventario;