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

      <p>User data should be maintained in the store, and modified through actions. It does not have to persist outside of the application (no external JSON files or endpoints necessary).</p>

      <p>We’re looking for an understanding of:</p>
      <ul>
        <li>How to use React’s state and props</li>
        <li>The React and Flux or Redux lifecycles</li>
        <li>ES6 Javascript</li>
      </ul>

      <p>The environment you use is up to you. Please make your code accessible through Git and be prepared to share it with the team.</p>

    </div>
  );
}

export default AboutPage;
