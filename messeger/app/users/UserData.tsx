import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Avatar from "../Components/Avatar";
import Loading from "../Components/Loading";
interface Props {
  data: User;
}

export default function UserData(props: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { userId: props.data.id })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [props.data, router]);

  return (
    <>
      {isLoading && <Loading />}

      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-white p-3  hover:bg-neutral-100 rounded-lg transition cursor-pointer"
      >
        <Avatar user={props.data!!} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {props.data?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
