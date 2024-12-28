const InputField=({label,type, placeholder,name,value,minLength,maxLength,onChange})=>{
return (
    <>
      <div className="col-lg form-group">
        <label>{label}</label>
        <input className="col-lg form-group form-control" type={type} placeholder={placeholder} required name={name} value={value} onChange={onChange} minLength={minLength} maxLength={maxLength}/>
      </div>

    </>
)


}

export default InputField 
