const API_BASE_URL = 'http://localhost:8080/api'; // UPDATE: Replace with your actual backend API URL

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(data: { email: string; username: string; password: string }) {
    return this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { usernameOrEmail: string; password: string }) {
    const response = await this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.token) {
      this.setToken(response.token);
    }
    return response;
  }

  // Student endpoints
  async submitThesis(data: any) {
    return this.makeRequest('/student/master-thesis/submit-thesis', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Mentor endpoints
  async uploadThesis(data: any) {
    return this.makeRequest('/mentor/master-thesis/upload-thesis', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async uploadRevisedThesis(data: any) {
    return this.makeRequest('/mentor/master-thesis/upload-revised-thesis', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async validateByMentor(data: any) {
    return this.makeRequest('/mentor/master-thesis/validate-by-mentor', {
      method: 'POST',  
      body: JSON.stringify(data),
    });
  }

  async selectCommissionMembers(data: any) {
    return this.makeRequest('/mentor/master-thesis/select-commission-members', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async scheduleDefense(data: any) {
    return this.makeRequest('/mentor/master-thesis/schedule-defense', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async submitCommissionReport(data: any) {
    return this.makeRequest('/mentor/master-thesis/submit-commission-report', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async markThesisDefended(data: any) {
    return this.makeRequest('/mentor/master-thesis/mark-thesis', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Administration endpoints
  async validateBySecretary(data: any) {
    return this.makeRequest('/administration/master-thesis/validate-by-secretary', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async validateSecondSecretaryPhase(data: any) {
    return this.makeRequest('/administration/master-thesis/validate-second-secretary-phase', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async validateThirdSecretaryPhase(data: any) {
    return this.makeRequest('/administration/master-thesis/validate-third-secretary-phase', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async validateFourthSecretaryPhase(data: any) {
    return this.makeRequest('/administration/master-thesis/validate-fourth-secretary-phase', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async validateByAdministration(data: any) {
    return this.makeRequest('/administration/master-thesis/validate-by-administration', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async validateByCommission(data: any) {
    return this.makeRequest('/administration/master-thesis/validate-by-commission', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async secondaryValidateByTeachingCommission(data: any) {
    return this.makeRequest('/administration/master-thesis/secondary-validate-by-teaching-commission', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async archiveThesis(data: any) {
    return this.makeRequest('/administration/master-thesis/archive-thesis', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // System endpoints
  async approveCommission(data: any) {
    return this.makeRequest('/system/master-thesis/approve-commission', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async approveSecondCommission(data: any) {
    return this.makeRequest('/system/master-thesis/approve-second-commission', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService(API_BASE_URL);