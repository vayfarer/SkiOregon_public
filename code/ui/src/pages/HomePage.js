import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';
// import axios from 'axios';

function HomePage( {setExerciseEdit} ) {

    const navigate = useNavigate();

    return (
        <>
            <h1>SkiOregon!</h1>
            <p>
            One stop shop for all your skiing and snowboarding needs in Oregon. 
            </p>
           
        </>
    );
}

export default HomePage;