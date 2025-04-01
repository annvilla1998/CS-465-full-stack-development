const tripsEndpoint = "http://localhost:3000/api/trips";
const options = {
    method: "GET",
    headers: {
        'Accept': 'application/json'
    }
}
/** GET travel view */
const travel = async(req, res) => {
    await fetch(tripsEndpoint, options)
    .then(res => res.json())
    .then(trips => {

        let message = null;
        if(!(trips instanceof Array)) {
            message = 'API lookup error';
            trips = [];
        } else { 
            if(!trips.length) {
                message = "No trips exist in our database!"
            }
        }
        res.render('travel', { title: 'Travlr Getaways', trips, message });
    })
    .catch(err => res.status(500).send(e.message));
};

module.exports = {
    travel
};