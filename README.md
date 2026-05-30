# Internship Search Portal (Internshala Replica)

A sleek, responsive, and performant frontend replica of the **Internshala Internship Search Portal** built with **React**, **Vite**, and **Tailwind CSS**. It fetches live internship listings dynamically and implements robust client-side search, sorting, and multi-filtering logic.

---

## ✦ Key Features

- **Live Dynamic Search:** Instant search by internship profile title and company name, debounced to minimize re-renders.
- **Robust Multi-Filtering:**
  - **Text Match:** Filter by profile name and location.
  - **Duration Ranges:** Custom controls for *Minimum* and *Maximum* durations.
  - **Stipend Range:** A slider to set minimum monthly stipend.
  - **Toggle Preferences:** Quick toggles for *Work From Home*, *Actively Hiring*, and *Recently Posted* listings.
- **Intelligent Sorting:** Sort listings instantly by Relevance, Latest date, or Stipend (High to Low).
- **Responsive Design:** Fully optimized layout for all devices. Uses a sticky desktop sidebar and an interactive mobile drawer panel.
- **Premium UI/UX:** 
  - Dynamic loading skeleton states.
  - Clearable filter chips for active parameters.
  - Interactive details modal for deep dives into listings.
  - Elegant typography, micro-interactions, and visual feedback.

---

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Vanilla CSS & utility configurations)
- **HTTP Client:** Axios (configured with timeout handling)
- **Icons:** React Icons (FontAwesome 6 integration)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Installation
Clone the repository and install the dependencies:
```bash
# Clone the repository
git clone https://github.com/Krishiv-12/INTERENSHALA-Assignment.git

# Navigate into the project folder
cd internship-search-portal

# Install npm dependencies
npm install
```

### 3. Run the Development Server
Start the local Vite development server:
```bash
npm run dev
```
The application will run locally at `http://localhost:5173/`.

### 4. Build for Production
To generate a production-ready bundle:
```bash
npm run build
```

---

## 📂 Project Structure

The project follows a clean, modular structure centered around React best practices:
```
src/
├── App.jsx                 # Root application wrapper
├── index.css               # Global Tailwind stylesheet
├── main.jsx                # Main entry point
└── features/
    └── internships/
        ├── api/            # API fetching modules (Axios client)
        ├── components/     # Modular UI elements (Card, Sidebar, Modal, Skeletons)
        ├── constants/      # Filter configs and option constants
        ├── hooks/          # Custom hooks (e.g. useInternships, useDebounce)
        ├── pages/          # Primary screen layouts
        └── utils/          # Normalization & sorting helper utilities
```
