import AccountCards from "../components/AccountCards/AccountCards";
import TransactionHistory from "../components/Userstable/TransactionHistory";

export default function page({ children }) {
  return (
    <>
      <AccountCards />
      <TransactionHistory />
    </>
  );
}
