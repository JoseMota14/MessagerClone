import getConversationById from "@/app/Utils/Services/getConversationById";
import getMessages from "@/app/Utils/Services/getMessages";
import Body from "./Components/Body";
import Form from "./Components/Form";
import Header from "./Components/Header";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <p>No data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages}></Body>
        <Form></Form>
      </div>
    </div>
  );
};

export default ChatId;
