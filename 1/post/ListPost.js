import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addPosts, deletePosts, getPosts} from "../postsService";
import swal from 'sweetalert';
import {Link, useNavigate} from "react-router-dom";

export default function ListPost(){
    const dispatch= useDispatch();
    const posts = useSelector(state => {
        return state.posts.posts;
    })
    // console.log(posts)
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(getPosts())
    },[])
    const handleDelete = async (id) => {
        dispatch(deletePosts(id)).then(()=>(
            dispatch(getPosts()).then(()=>{
                navigate('/home')
            })
        ))
    }
    const loading = useSelector(state => {
        return state.posts.loading
    })
    return(
        <>

            {loading === true ?
                <>
                    <div className="row">
                        <div className="offset-5 col-2" style={{textAlign: 'center', marginTop: '300px'}}>
                            <div className="loader"></div>
                        </div>
                    </div>
                </>
                :<>
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Salary</th>
                                    <th scope="col">Work Location</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Experience</th>
                                    <th scope="col">Work Time</th>
                                    <th scope="col">EndTime</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Recruitments Number</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    posts !== undefined && posts.map((item,index)=>(
                                            <tr>
                                                <th scope="col">{index + 1}</th>
                                                <td>{item.title}</td>
                                                <td>{item.salary}</td>
                                                <td>{item.workLocation}</td>
                                                <td>{item.position}</td>
                                                <td>{item.experience}</td>
                                                <td>{item.workTime}</td>
                                                <td>{item.endTime}</td>
                                                <td>{item.description}</td>
                                                <td>{item.recruitmentsNumber}</td>
                                                <td><img src={item.image} style={{width:'100px', height:'100px'}}></img></td>
                                                <td>
                                                    <button type="submit" className="ml-3 btn btn-danger" onClick={() => {
                                                        swal({
                                                            title: "Are you sure?",
                                                            text: "Once deleted, you will not be able to recover this imaginary file!",
                                                            icon: "warning",
                                                            buttons: true,
                                                            dangerMode: true,
                                                        })
                                                            .then((willDelete) => {
                                                                console.log(item)
                                                                if (willDelete) {
                                                                    swal("Poof! Your imaginary file has been deleted!", {
                                                                        icon: "success",
                                                                    }).then(() => {
                                                                        handleDelete(item.idPost)
                                                                    });
                                                                } else {
                                                                    swal("Your imaginary file is safe!")
                                                                }
                                                            });
                                                    }}>Delete
                                                    </button>
                                                    <button type="submit" className="ml-3 btn btn-primary">
                                                        <Link to={'/edit/' + item.id} style={{textDecoration:'none', color:'white'}}>Edit</Link>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            }
        </>
    )
}