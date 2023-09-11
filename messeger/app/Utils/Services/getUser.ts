import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

export default async function getUsers() {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }
  try {
    return await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
  } catch (e) {
    return [];
  }
}
