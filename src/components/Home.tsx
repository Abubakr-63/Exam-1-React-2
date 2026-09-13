import { addData2, deleteData2, editData2, useData, type RootState } from "../store/Store";
import { Edit, Info, Trash } from 'lucide-react';
import { Button, DialogContent, IconButton, MenuItem, Select, TextField, Typography, type SelectChangeEvent } from "@mui/material";
import CustomizedDialogs from "./CustomizedDialogs";
import { useEffect, useState } from "react";
import FormDialog from "./FormDialog";
import { useDispatch, useSelector } from "react-redux";

interface User {
    id : number,
    name : string,
    surname : string,
    age : string,
    status : boolean,
    city : string,
    job : string
}

type User1 = { id: number, name: string, status: boolean, job: string };
type User2 = { id: number, age: string, city: string, surname: string };

export default function Home() {
  const [obj, setObj] = useState<Partial<User>>({});
  const [object1, setObject1] = useState<Partial<User1>>({});
  const [object2, setObject2] = useState<Partial<User2>>({});
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const {data, deleteData, editData, addData, searchData} = useData((state) => state);
  const data2 = useSelector((state:RootState) => state.data2);
  const dispatch = useDispatch();
  const [MainData, setMainData] = useState<User[]>([]);
  const [select, setSelect] = useState('all');
  const [search, setSearch] = useState('');
  useEffect(() => {
    setMainData(data.map((elem:any) => {
    let reduxElem = data2.find(el => el.id == elem.id);
    if(reduxElem && elem.id == reduxElem.id){
    return { 
      ...elem,
       ...reduxElem 
      };
    }
    return elem;
  }))
  }, [data, data2])
  useEffect(() => {
    setObject1({
      id : obj.id,
      name : obj.name,
      status : obj.status,
      job : obj.job
    })
    setObject2({
      id : obj.id,
      age : obj.age,
      city : obj.city,
      surname : obj.surname
    })
  }, [obj])

  const handleClick = (e:any) => {
    e.preventDefault();
    setOpenEdit(false)
    editData(object1 as User1)
    dispatch(editData2(object2 as User2))
    setObj({})
  }
  const handleClickAdd = (e:any) => {
    e.preventDefault();
    setOpenAdd(false)
    addData(object1 as User1)
    dispatch(addData2(object2 as User2))
    setObj({})
  }

  function checkboxcheck(elem:User){
    setObj({...elem, status : !elem.status});
    editData(object1 as User1)
  }

  function handleSearch(e:SelectChangeEvent){
    setSelect(e.target.value);
    searchData(search)
  }
  return (
    <>
    <div className="container mx-auto flex items-center justify-between">
      <h1 className="text-3xl font-bold">Crud</h1>
      <div className="flex items-center gap-10 mt-10">
        <TextField type="search"  value={search} onChange={(e) => {
          setSearch(e.target.value);
        }} variant="standard" label="Search..."/>
        <Select sx={{height: 35}} value={select} onChange={handleSearch}>
          <MenuItem value='all'>All Status</MenuItem>
          <MenuItem value='active'>Active</MenuItem>
          <MenuItem value='inactive'>InActive</MenuItem>
        </Select>
      <Button onClick={() => setOpenAdd(!openAdd)} variant="outlined">Add +</Button>
      </div>
      </div><br />
      <table className="w-full container border-collapse mx-auto">
        <thead>
          <tr>
          <th className="border-2 px-3 py-1 text-start">Name</th>
          <th className="border-2 px-3 py-1 text-start">Age</th>
          <th className="border-2 px-3 py-1 text-start">Status</th>
          <th className="border-2 px-3 py-1 text-start">City</th>
          <th className="border-2 px-3 py-1 text-start">Job</th>
          <th className="border-2 px-3 py-1 text-start">Action</th>
          </tr>
        </thead>
        <tbody>
          {MainData.length > 0 ? MainData.map((elem:User) => (
            <tr key={elem.id}>
              <td className="border-2 text-center px-3 py-1 text-start">
                <div className="flex items-center gap-3">
              <TextField
              onChange={() => checkboxcheck(elem)}
              type="checkbox"
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              variant="standard"
                />{elem.name} {elem.surname}
                </div></td>
              <td className="border-2 px-3 py-1 text-start">{elem.age}</td>
              <td className={`p-1 border-2 px-3 py-1 text-start ${elem.status ? 'bg-green-500' : 'bg-gray-500'}`}>{elem.status ? "Active" : "InActive"}</td>
              <td className="border-2 px-3 py-1 text-start">{elem.city}</td>
              <td className="border-2 px-3 py-1 text-start">{elem.job}</td>
              <td className="border-2 px-3 py-1">
                <div className="flex items-center w-2">
                  <IconButton sx={{color : "red"}} onClick={() => (deleteData(elem.id), dispatch(deleteData2(elem.id)))}><Trash/></IconButton>
                  <IconButton onClick={() => {
                    setOpenEdit(true)
                    setName(elem.name);
                    setObj(elem)
                  }}><Edit/></IconButton>
                  <IconButton onClick={() => {
                    setOpen(true);
                    setObj(elem);
                  }}><Info/></IconButton>
                </div>
              </td>
            </tr>
          )) : <tr><td>Users Not Found</td></tr>}
        </tbody>
      </table>
      <CustomizedDialogs boolean={open} setBoolean={setOpen} text="Profile">
        <DialogContent dividers>
          <Typography gutterBottom>
            Name : <span>{obj.name}</span>
          </Typography>
          <Typography gutterBottom>
            Age : <span>{obj.age}</span>
          </Typography>
          <Typography gutterBottom>
           Status : <span>{obj.status ? "Active" : "InActive"}</span>
          </Typography>
          <Typography gutterBottom>
           City : <span>{obj.city}</span>
          </Typography>
          <Typography gutterBottom>
           Job : <span>{obj.job}</span>
          </Typography>
        </DialogContent>
      </CustomizedDialogs>
      <FormDialog text={`Edit ${name}`} boolean={openEdit} onClick={handleClick} setObj={setObj} setBoolean={setOpenEdit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              type="text"
              fullWidth
              value={obj.name}
              onChange={(e) => setObj({...obj, name : e.target.value})}
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              type="text"
              fullWidth
              value={obj.surname}
              onChange={(e) => setObj({...obj, surname : e.target.value})}
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="age1"
              name="age2"
              type="text"
              fullWidth
              value={obj.age}
              onChange={(e) => setObj({...obj, age : e.target.value})}
              variant="standard"
            />
            <select value={obj.status ? 'active' : 'inactive'} onChange={(e) => setObj({...obj, status : e.target.value === 'active'})} className="w-full border my-5 p-2">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <TextField
              autoFocus
              required
              margin="dense"
              id="city"
              name="city"
              type="text"
              fullWidth
              value={obj.city}
              onChange={(e) => setObj({...obj, city : e.target.value})}
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="city"
              name="city"
              type="text"
              fullWidth
              value={obj.job}
              onChange={(e) => setObj({...obj, job : e.target.value})}
              variant="standard"
            />
      </FormDialog>
      <FormDialog text={`Add New User`} boolean={openAdd} setObj={setObj} onClick={handleClickAdd} setBoolean={setOpenAdd}>
            <TextField
              autoFocus
              required
              label="Name"
              margin="dense"
              id="name"
              name="name"
              type="text"
              fullWidth
              value={obj.name}
              onChange={(e) => setObj({...obj, name : e.target.value})}
              variant="standard"
            />
            <TextField
              autoFocus
              required
              label="Surname"
              margin="dense"
              id="name"
              name="name"
              type="text"
              fullWidth
              value={obj.surname}
              onChange={(e) => setObj({...obj, surname : e.target.value})}
              variant="standard"
            />
            <TextField
              autoFocus
              required
              label="Email"
              margin="dense"
              id="age2"
              name="age2"
              type="text"
              fullWidth
              value={obj.age}
              onChange={(e) => setObj({...obj, age : e.target.value})}
              variant="standard"
            />
            <select onChange={(e) => setObj({...obj, status : e.target.value === 'active'})} className="w-full border my-5 p-2">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <TextField
              autoFocus
              required
              label="City"
              margin="dense"
              id="city"
              name="city"
              type="text"
              fullWidth
              value={obj.city}
              onChange={(e) => setObj({...obj, city : e.target.value})}
              variant="standard"
            />
            <TextField
              autoFocus
              required
              label="Job"
              margin="dense"
              id="city"
              name="city"
              type="text"
              fullWidth
              value={obj.job}
              onChange={(e) => setObj({...obj, job : e.target.value})}
              variant="standard"
            />
      </FormDialog>
    </>
  )
}