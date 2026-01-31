




export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if(!user){
    return <p>You must be logged in</p>
  }

  return(
    <div className="">





    </div>





  )
  
  
}
