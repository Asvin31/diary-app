import { createContext, useState } from 'react';

export const DateContext = createContext();

const DateContextProvider = (props) => {
    const [dateSelected, setDateSelected] = useState(null);
    const [snackBar, setSnackBar] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [dateDetails, setDateDetails] = useState({
        "content": null,
        "errorData": null
    });
    const [contentDetails, setContentDetails] = useState({
        "id": null,
        "content": null
    });
    const [getDetailsFlag, setGetDetailsFlag] = useState(false);
    const storeDateSelected = date => {
        setDateSelected(date);
    }
    return (
        <DateContext.Provider
            value={
                {
                    dateSelected, snackBar, severity, message, loading, dateDetails,
                    contentDetails, getDetailsFlag, setGetDetailsFlag, storeDateSelected,
                    setSnackBar, setSeverity, setMessage, setLoading, setDateDetails,
                    setContentDetails
                }
            }>
            {props.children}
        </DateContext.Provider>
    )
}

export default DateContextProvider