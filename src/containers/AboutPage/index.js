import React from 'react';

export function AboutPage() {
  return (
    <div>
      <h1>Homework</h1>
      <p>
        Create a simple user management application using React and Flux or
        Redux.
      </p>

      <p>Acceptance criteria:</p>
      <ul>
        <li>Displays a list of users using JSX</li>
        <li>Can add and remove users</li>
        <li>Can update existing user information</li>
        <li>
          User info includes
          <ul>
            <li>First name</li>
            <li>Last name</li>
            <li>Address</li>
          </ul>
        </li>
        <li>
          Has a basic UI (something more than unformatted text on a screen)
        </li>
      </ul>
    </div>
  );
}

export default AboutPage;
