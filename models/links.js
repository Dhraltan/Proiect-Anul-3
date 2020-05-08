const links = [];

// User enters room
function createLink(id, username, room) {
    const link = { id, username, room };
    
    links.push(link);

    return link;
}

// Get current link
function getLink(id) {
    return links.find(link => link.id === id)
}

// User exists room
function destroyLink(id) {
    const index = links.findIndex(link => link.id === id);

    if (index !== -1){
        return links.splice(index, 1)[0];
    }
}

// Get room users
function getRoomUsers(room) {
    return links.filter(link => link.room === room);
}

module.exports = {
    createLink,
    getLink,
    destroyLink,
    getRoomUsers
}