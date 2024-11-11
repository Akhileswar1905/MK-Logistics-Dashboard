import { Suspense } from "react";
import Reports from "./pageComp";
const page = () => (
  <Suspense fallback="Loading...">
    <Reports />
  </Suspense>
);
export default page;
