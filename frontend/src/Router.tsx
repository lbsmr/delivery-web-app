import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Pages } from './pages/Pages';

function Router(){
    return(
        <BrowserRouter>
            <Pages/>
        </BrowserRouter>
    )
}

export default Router;