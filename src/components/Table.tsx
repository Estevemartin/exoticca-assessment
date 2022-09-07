import {ReactNode, useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid';
import {toast} from "react-toastify";

import {Box, Typography, Button, TextField, Dialog, DialogActions, 
  DialogTitle, IconButton, CircularProgress} from '@mui/material';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';

import {useDeletePost, useEditPost} from "../hooks/usePosts"

import {Post,UserPost} from "../types"

type TableProps = {
  data:Post[],
  isLoading:Boolean,
  isError:Boolean
}

function Table({data, isLoading, isError}:TableProps) {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false)
  const [postIdToDelete,setPostIdToDelete]=useState<number | null>(null)
  const [postToBeEdited,setPostToBeEdited] = useState<UserPost | null>(null)
  const [title, setTitle] =useState<string>("")
  const [description,setDescription] = useState<string>("")
  const queryClient = useQueryClient()
  const containerStyle:Object = {width: "100%", marginTop:"25px", height:"631px"}
  const columns = [
    {
      field: 'id',
      headerName: 'Post Id',
      editable: true,
      width:80
    },
    {
      field: 'user.name',
      headerName: 'User Name',
      editable: true,
      width:250,
      valueGetter: (params) => {return (params.row.user.name)}
    },
    {
      field: 'title',
      headerName: 'Title',
      editable: true,
      flex:1
    },
    {
      field: 'body',
      headerName: 'Post',
      editable: true,
      flex:1
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable:false,
      renderCell: (params) => {return ( 
        <Box style={{display:"flex", alignItems:"center", justifyContent:"space-around", width:"100%"}}>
          <IconButton onClick={()=>{setIsEditModalVisible(true);setPostToBeEdited(params.row)}}>
            <ModeIcon  fontSize="small" sx={{color:"gray"}}/>
          </IconButton>
          <IconButton onClick={()=>{setIsDeleteModalVisible(true);setPostIdToDelete(params.row.id)}}>
            <DeleteIcon  fontSize="small" sx={{color:"gray"}}/>
          </IconButton>
        </Box>
      )}
    },
    
  ]
  // #region EDIT POST
  const {mutateAsync:editPost} = useEditPost(postToBeEdited)
  const renderEditModal = (): void|ReactNode => {
    if(isEditModalVisible && postToBeEdited!==null){
      const {title,body} = postToBeEdited
      return (
        <Box>
          <Dialog open={isEditModalVisible} onClose={():void=>{setIsEditModalVisible(false)}} fullWidth={true} >
            
            <DialogTitle>
              Edit and save this post
            </DialogTitle>

            <TextField defaultValue={title} autoFocus margin="dense" id="title" label="Title" type="text" 
            variant="standard" onChange={(e):void=>{setTitle(e.target.value)}} sx={{m:3}}/>
            <TextField defaultValue={body} multiline margin="dense" id="description" label="Description"
            type="text" variant="standard" onChange={(e):void=>{setDescription(e.target.value)}} sx={{m:3}}/>

            <DialogActions>
              <Button variant="outlined" onClick={():void=>{setIsEditModalVisible(false)}}>Cancel</Button>
              <Button variant="contained" onClick={():void=>{submitEditPost()}}>Save Post</Button>
            </DialogActions>

          </Dialog>
        </Box>
      );
    }
  }
  const submitEditPost = async (): Promise<void> => {
    var toastId = toast.loading("Saving Changes...",{ type:"info",theme:"colored"})
    await editPost({title,body:description,id:postToBeEdited?.id, userId:postToBeEdited?.user.id},{
      onSuccess:()=>{
        queryClient.invalidateQueries(['fetch-posts'])
        toast.update(toastId, { render: "Landing Successfully Edited.", type: "success", isLoading: false, autoClose:2000,theme:"colored" });
        setIsEditModalVisible(false)
      },
      onError:()=>{
        // toast.error("Something went wrong. Try again later.",{theme:"colored"})
        toast.update(toastId, { render: "Something went wrong. Try again later.", type: "error", isLoading: false, autoClose:2000,theme:"colored" });
      }
    })
  }
  // #endregion

  // #region DELETE POST
  const {mutateAsync:deletePost} = useDeletePost(postIdToDelete)
  const renderDeleteModal = (): void|ReactNode  => {
    if(isDeleteModalVisible&&postIdToDelete){
      const {title:postTitle, body:postBody, user:postUser} = data[postIdToDelete-1]
      return (
        <Box>
          <Dialog  open={isDeleteModalVisible} onClose={():void=>{setIsDeleteModalVisible(false)}}>
            <DialogTitle>Are you sure that you want to delete this post?</DialogTitle>
              <h3 style={{margin:"0px 35px"}}>{postTitle}</h3>
              <p style={{margin:"0px 35px"}}>{postBody}</p>
              <i style={{margin:"10px 35px 20px 35px", textAlign:"right"}}>From: {postUser.name}</i>
            <DialogActions>
              <Button variant="outlined" onClick={():void=>{setIsDeleteModalVisible(false)}}>Cancel</Button>
              <Button variant="contained" color="error" onClick={():void=>{submitDeletePost()}}>Delete Post</Button>
            </DialogActions>
          </Dialog>
        </Box>
      );
    }
  }
  const submitDeletePost = async ():Promise<void> => {
    var toastId = toast.loading("Deleting Landing...",{ type:"info",theme:"colored"})
    await deletePost(postIdToDelete,{
      onSuccess:()=>{
        queryClient.invalidateQueries(['fetch-posts'])
        toast.update(toastId, { render: "Landing Successfully Deleted.", type: "success", isLoading: false, autoClose:2000,theme:"colored" });
        setIsDeleteModalVisible(false)
      },
      onError:()=>{
        toast.update(toastId, { render: "Something went wrong. Try again later.", type: "error", isLoading: false, autoClose:2000,theme:"colored" });
      }
    })
  }
  // #endregion
  
  if(isLoading){
    return(
      <Box style={containerStyle}>
        <Box style={{ display: 'flex', height: '100%' }}>
          <Box style={{ flexGrow: 1, display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <CircularProgress />
            <Typography variant="body2" style={{marginTop:20}}>Loading data...</Typography>
          </Box>
        </Box>
      </Box>
    )
  }
  if(isError){
    return(
      <Box style={containerStyle}>
        <Box style={{ display: 'flex', height: '100%' }}>
          <Box style={{ flexGrow: 1, paddingTop:"100px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <CloudOffIcon/>
            <Typography variant="body2" style={{marginTop:15}}>Something went wrong.</Typography>
            <Typography variant="body2" style={{margin:0}}>Please try again later.</Typography>
          </Box>
        </Box>
      </Box>
    )
  }
  return (
    <Box style={containerStyle}>
      <Box style={{ display: 'flex', height: '100%' }}>
        <Box style={{ flexGrow: 1, backgroundColor:"white" }}>
          <>
          {renderDeleteModal()}
          {renderEditModal()}
          <DataGrid rows={data} columns={columns}/>
          </>
        </Box>
      </Box>
    </Box>
  );
}

export default Table
