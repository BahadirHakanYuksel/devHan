import {
  Body,
  //   Column,
  Container,
  Head,
  //   Heading,
  //   Hr,
  Html,
  //   Link,
  Preview,
  //   Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
export default function MyTemplate() {
  return (
    <Html>
      <Head />
      <Preview>Nabersiniz...</Preview>
      <Tailwind>
        <Body className="bg-black text-white rounded-lg border-2 border-solid border-orange-500">
          <Container className="mx-auto w-full max-w-[600px] p-5 flex flex-col gap-10 items-center">
            <Section className="flex flex-col gap-0 text-center justify-center items-center">
              <Text className="text-6xl font-extrabold italic flex items-center text-orange-500 px-5">
                Developer Hanı
              </Text>
              <Text className="text-sm text-gray-400 underline">
                2025 - Etkinlik
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
