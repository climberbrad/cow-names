export const fetchData = async () => {
    const res = await fetch('http://localhost:8080/v0/cows');
    if(!res.ok) {
        throw new Error("Something went wrong.")
    }
    return res.json();
}

export const saveCow = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(data)
    };
    const resp = await fetch('http://localhost:8080/v0/cows', options);
    if (!resp.ok) {
        console.error(`Error encountered`);
    }
}

export const deleteCow = async ({id}) => {
    const options = {
        method: 'DELETE'
    };
    const resp = await fetch(`http://localhost:8080/v0/cows/${id}`, options);
    if (!resp.ok) {
        console.error(`Error encountered`);
    }
}