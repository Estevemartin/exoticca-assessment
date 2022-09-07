import '../App.css';

import {useState, useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {Stack, Box, Typography, Breadcrumbs, Link, Button, TextField, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {toast} from "react-toastify";

import {useAddPost, useFetchPost} from "../hooks/usePosts"
import {useFetchUsers} from "../hooks/useUsers"

import {UserPost} from "../types"

import Navbar from '../components/Navbar';
import Table from '../components/Table'

const Main = () => {
  const queryClient = useQueryClient()

  const [data,setData]=useState<UserPost[]>([])
  const [isLoading,setIsLoading] = useState<boolean>(true)
  const [error,setError]=useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [title,setTitle]=useState<string>("")
  const [description,setDescription]=useState<string>("")
  
  const {data:posts, error:isErrorPost, isLoading:isLoadingPosts} = useFetchPost()
  const {data:users, error:isErrorUser, isLoading:isLoadingUsers} = useFetchUsers()

  useEffect(()=>{
    if(!isLoadingPosts && !isLoadingUsers){
      if(!isErrorUser && !isErrorPost){
        const populatedPosts:UserPost[] = posts.map(post=>{
          post.user=users.filter((user)=>user.id===post.userId)[0]
          return(post)
        }) 
        setData(populatedPosts)
        setIsLoading(false)
      }else{
        setError(true)
        toast.error("Data couldn't be loaded. Try again later.",{theme:"colored"})
      }
      
    }
  },[posts,users])

  // #region EDIT POST
  // THIS SHOULDN'T BE RUNNING ALL THE TIME
  // console.log("Rerendering component")
  const {mutateAsync:addPost} = useAddPost()
  const submitNewLanding = async () => {
    if(title===""){
      toast.error("Don't forget to fill the title.",{theme:"colored"})
    }else{
      if(description===""){
        toast.error("Don't forget to fill the description.",{theme:"colored"})
      }else{
        const post = {title,description}
        var toastId = toast.loading("Creating Landing...",{ type:"info",theme:"colored"})

        await addPost(post,{
          onSuccess:()=>{
            queryClient.invalidateQueries(['fetch-posts'])
            toast.update(toastId, { render: "Landing Successfully Created.", type: "success", isLoading: false, autoClose:2000,theme:"colored" });
            setIsModalVisible(false)
          },
          onError:()=>{
            toast.update(toastId, { render: "Something went wrong. Try again later.", type: "error", isLoading: false, autoClose:2000,theme:"colored" });
          }
        })
      }
    }
  }
  const renderNewLandingModal = () => {
    if(isModalVisible){
      return (
        <Box>
          <Dialog open={isModalVisible} onClose={()=>{setIsModalVisible(false)}}>
            <DialogTitle>Create a New Landing</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please, enter the title and description of the landing.
              </DialogContentText>
              <TextField autoFocus margin="dense" id="title" label="Title"
                type="text" fullWidth variant="standard"
                onChange={(e)=>{setTitle(e.target.value)}}
              />
              <TextField placeholder="Description: Maximum 10 rows"  multiline  maxRows={10} 
                sx={{ width: "100%", height:"75px", mt:4 }}  onChange={(e)=>{setDescription(e.target.value)}}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={()=>{setIsModalVisible(false)}}>Cancel</Button>
              <Button variant="contained" onClick={()=>{submitNewLanding()}}>Add New Landing</Button>
            </DialogActions>
          </Dialog>
        </Box>
      );
    }
  }
  // #endregion
  
  return (

      <Box sx={{ display: 'flex', height:"100%" }}>

        <Navbar/>
        
        <Box component="main" sx={{ flexGrow: 1, pt: 3 }}>
        
          <Box role="presentation" style={{paddingBottom:"15px", paddingLeft:"15px"}}>
            <Breadcrumbs aria-label="breadcrumb" separator=">" sx={{color:"rgb(5,22,61)"}}>
              <Link underline="hover" color="inherit" href="/">
                Dashboard
              </Link>
              <Link underline="hover" color="inherit" href="/">
                Landing
              </Link>
            </Breadcrumbs>
          </Box>
          
          <Box sx={{backgroundColor:"rgb(244,246,248)",p:3, height: 'calc(100% - 50px)'}}>
          <Stack spacing={2} direction="row" justifyContent="space-between"  alignItems="center" sx={{ flexGrow: 1}}>

            <Typography variant="h5" sx={{fontWeight:"bold"}} gutterBottom>
              Landings List
            </Typography>

            <Button variant="contained" size="small" sx={{fontSize:"8pt", p:1, px:2, textTransform: 'none', borderRadius: '10px'}} 
            startIcon={<AddIcon/>} onClick={()=>{setIsModalVisible(true)}}>
              New Landing
            </Button>

            </Stack>
            {renderNewLandingModal()}
            <Table data={data} isLoading={isLoading} isError={error} />
          </Box>
        </Box>

    </Box>
  );
}

export default Main;
