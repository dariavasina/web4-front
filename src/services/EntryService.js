import axios from 'axios';

const ENTRY_API_BASE_URL = "http://localhost:8080/api/v1/entries"

class EntryService {
    getEntries() {
        return axios.get(ENTRY_API_BASE_URL);
    }

     createEntry(entry) {
        return axios.post(ENTRY_API_BASE_URL, entry);
     }

    clearAllEntries() {
        return axios.delete(ENTRY_API_BASE_URL);
    }
}

export default new EntryService()