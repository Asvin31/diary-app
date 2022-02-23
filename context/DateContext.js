import { createContext, useState } from 'react';
import moment from 'moment';

export const DateContext = createContext();

const DateContextProvider = (props) => {
    const [dateSelected, setDateSelected] = useState(null);
    const storeDateSelected = date => {
        setDateSelected(date);
    }
    return (
        <DateContext.Provider value={{ dateSelected, storeDateSelected }}>
            {props.children}
        </DateContext.Provider>
    )
}

export default DateContextProvider