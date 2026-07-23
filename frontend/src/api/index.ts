import axios from "axios"

class DashboardService {
  async getDashboard(
    filters: { 
      indicator: string 
      region: string 
    }) {
    const { data } = await axios.get(`${import.meta.env.BACKEND_SERVICE_URL}/api/dashboard`, {
      params: filters,
    })
    return data
  }
}

export const getDashboard = new DashboardService().getDashboard