import { Alert } from "react-bootstrap";
function Message({variant,children}){
    //variant for the color we want and children as the property of react 
    return(
        <div variant={variant}>
        {children}
        </div>
    )
}
export default Message;
