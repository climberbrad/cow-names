export const fetchCows = async () => {
    const res = await fetch('http://localhost:8080/cows');
    if(!res.ok) {
        throw new Error("Error fetching cow.")
    }
    return res.json();
}

export const saveCow = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    const resp = await fetch('http://localhost:8080/cows', options);
    if (!resp.ok) {
        console.error(`Error savings cows`);
    }
}

export const deleteCow = async ({id}) => {
    console.log('DELETE', id)
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const resp = await fetch(`http://localhost:8080/cows/${id}`, options);
    if (!resp.ok) {
        console.error(`Error deleting cows`);
    }
}