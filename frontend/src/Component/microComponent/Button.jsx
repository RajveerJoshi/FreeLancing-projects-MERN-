const Button=({type,className})=>{
    return(
        <>
              <div className="col-lg form-group">   
        <button className={className} type={type}>Submit</button>  
        </div>
        
        </>
    )
}

export default Button