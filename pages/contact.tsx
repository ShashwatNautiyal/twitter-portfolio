import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { MdAccessTime, MdMail } from "react-icons/md";
import Button from "../src/components/Button";
import Container from "../src/components/Container";
import FadeTransition from "../src/components/FadeTransition";
import TabsContainer from "../src/components/TabsContainer";
import Tweet from "../src/components/Tweet";
import { TweetType } from "../src/types";
import { axiosInstance } from "../src/utils/axios";
import { getTweetFromInformation } from "../src/utils/common";
import { getDomain } from "../src/utils/domain";

const ContactPage = ({
  filteredContacts,
  scheduleCallContact,
  informationTweets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex gap-4">
      <TabsContainer
        tabNames={["Information"]}
        tabs={[<InformationTab key={1} tweets={informationTweets} />]}
      />
      <div className="w-[40%] text-sm flex flex-col gap-4 h-fit sticky top-6">
        <Container title="Where to follow me">
          <FadeTransition.Root classname="flex flex-col gap-4">
            {filteredContacts.map((contact: any, index: number) => (
              <FadeTransition.Child
                classname="flex items-center justify-between"
                delay={index * 10}
                key={contact.name}
              >
                <div className="flex items-center gap-2">
                  <div className="shrink-0">
                    <Image
                      alt="profile picture"
                      src={contact.logo}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="font-medium">{contact.name}</div>
                      <Image
                        alt="verified bage"
                        src={"/images/verify.png"}
                        width={12}
                        height={12}
                        className="rounded-full"
                      />
                    </div>
                    <div className="font-light text-gray-dark">@{contact.username}</div>
                  </div>
                </div>
                <Button
                  color="blue"
                  referrerPolicy="no-referrer"
                  target="_blank"
                  href={
                    contact.name === "E-Mail" ? `mailto:${contact.link}` : (contact.link as string)
                  }
                >
                  {contact.name === "E-Mail" ? "Mail" : "Follow"}
                </Button>
              </FadeTransition.Child>
            ))}
          </FadeTransition.Root>
        </Container>
        <Container title="Schedule a call">
          <FadeTransition.Root classname="flex flex-col gap-4">
            {scheduleCallContact.map((contact: any, index: number) => (
              <FadeTransition.Child
                classname="flex items-center justify-between"
                delay={index * 10}
                key={contact.name}
              >
                <div className="flex items-center gap-2">
                  <div className="shrink-0">
                    <Image
                      alt="profile picture"
                      src={contact.logo}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="font-medium">{contact.name}</div>
                      <Image
                        alt="verified bage"
                        src={"/images/verify.png"}
                        width={12}
                        height={12}
                        className="rounded-full"
                      />
                    </div>
                    <div className="font-light text-gray-dark">@{contact.username}</div>
                  </div>
                </div>
                <Button
                  color="black"
                  referrerPolicy="no-referrer"
                  target="_blank"
                  href={contact.link as string}
                >
                  {"Book"}
                </Button>
              </FadeTransition.Child>
            ))}
          </FadeTransition.Root>
        </Container>
      </div>
    </div>
  );
};

const InformationTab = ({ tweets }: { tweets: TweetType[] }) => {
  return (
    <div>
      {tweets.map((tweet, index) => (
        <Tweet
          index={index}
          key={tweet.id}
          imgSrc={"/images/profile.png"}
          name={tweet.name}
          nameLink={tweet.nameLink}
          username={tweet.username}
          usernameLink={tweet.usernameLink}
          verified={tweet.verified}
          description={tweet.description}
          InfoIcon={<MdAccessTime size={16} />}
          info={{
            data: tweet.info,
          }}
          text={tweet.text}
          BottomIcons={[
            {
              Icon: <MdMail size={16} />,
            },
          ]}
          details={tweet.details.map((detail) => ({
            data: detail.data,
          }))}
        />
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const {
    data: { data: contactsData },
  } = await axiosInstance.get("/contacts?populate=logo");
  const {
    data: { data: informationData },
  } = await axiosInstance.get("/informations");

  const imageDomain = getDomain();

  const contacts = contactsData.map(({ attributes }: { attributes: any }) => {
    const {
      data: { attributes: logoAttributes },
    } = attributes.logo;

    return {
      name: attributes.name,
      username: attributes.username,
      link: attributes.link,
      logo: `${imageDomain}${logoAttributes.url}`,
    };
  });

  const filteredContacts = contacts.filter(({ name }: { name: string }) => name !== "Topmate");
  const scheduleCallContact = contacts.filter(({ name }: { name: any }) => name === "Topmate");
  const informationTweets = informationData.map((info: any) => getTweetFromInformation(info));

  return {
    props: {
      filteredContacts,
      scheduleCallContact,
      informationTweets,
    },
  };
}

export default ContactPage;
