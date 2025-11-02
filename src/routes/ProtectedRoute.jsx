// So, this is our Protected Route component.

//its works as a wrapper component that ensures only authenticated users can access certain pages

import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

export default function ProtectedRoute({ children }) {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
    // With replace:
// → The current entry in the history stack is replaced with the new route (/login).
// → The previous page (e.g., /products) is removed from history.
// → User cannot go back to the protected page using the browser’s Back button.
  }
  return children; //Here Children represents whatever is passed between the opening and closing tags of a component here the children is  <ProductListPage />

  //satisfies your assignment’s requirement:

// THIS ENSURES THAT the main Product List view must only be accessible after the user has successfully logged in
}