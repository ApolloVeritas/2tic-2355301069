// src/services/notesAPI.js
import axios from 'axios'

const API_URL = "https://mstsvuhoexfhhxvwwuzd.supabase.co/rest/v1/notes" // ganti dengan URL project kamu
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zdHN2dWhvZXhmaGh4dnd3dXpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTk3NTAyNSwiZXhwIjoyMDY3NTUxMDI1fQ.OH_PIJf9z8fF5FOfrcdLbWXrscX2xuSKJGYcCbRVJUI" // ganti dengan apikey kamu

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json"
}

export const notesAPI = {
  async fetchNotes() {
    const response = await axios.get(API_URL, { headers })
    return response.data
  },
  async createNote(data) {
    const response = await axios.post(API_URL, data, { headers })
    return response.data
  },
  async deleteNote(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
  }
}
