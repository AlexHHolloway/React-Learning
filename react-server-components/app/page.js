import fs from "node:fs/promises";

import { Suspense } from "react";
import DataFetchingDemo from "@/components/DateFetchingDemo";
import ClientDemo from "@/components/ClientDemo";
import RSCDemo from "@/components/RSCDemo";
import ServerActionsDemo from "@/components/ServerActionsDemo";
import UsePromiseDemo from "@/components/usePromiseDemo";
import ErrorBoundary from "@/components/ErrorBoundary";

export default async function Home() {
  const fetchUsers = new Promise((resolve, reject) =>
    setTimeout(async () => {
      const data = await fs.readFile("dummy-db.json", "utf-8");
      const users = JSON.parse(data);
      // resolve(users);
      reject(new Error("Error!"));
    }, 2000)
  );

  return (
    <main>
      <ErrorBoundary fallback={<span>Something went wrong.</span>}>
        <Suspense
          fallback={
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading content...</p>
            </div>
          }
        >
          <UsePromiseDemo usersPromise={fetchUsers} />
        </Suspense>
      </ErrorBoundary>

      {/* <ServerActionsDemo />
      <DataFetchingDemo /> */}
      {/* <ClientDemo>
        <RSCDemo />
      </ClientDemo> */}
    </main>
  );
}
