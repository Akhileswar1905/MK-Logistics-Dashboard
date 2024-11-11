import { Suspense } from "react";
import PayReqPage from "./pageComp";
const page = () => (
  <Suspense fallback="Loading...">
    <PayReqPage />
  </Suspense>
);
export default page;
