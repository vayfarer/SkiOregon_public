import axios from "axios";

// The axios.
// Change baseURL to point to express server.

export default axios.create({
    baseURL: `http://flip3.engr.oregonstate.edu:8072/`
})