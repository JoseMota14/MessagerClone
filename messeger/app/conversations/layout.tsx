import Sidebar from "../Components/Sidebar/Sidebar";
import getConversations from "../Utils/Services/getConversations";
import getUsers from "../Utils/Services/getUser";
import List from "./Components/List";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <List items={conversations}></List>
        {children}
      </div>
    </Sidebar>
  );
}
