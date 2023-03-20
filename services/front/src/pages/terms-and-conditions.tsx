import React from 'react';

import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import DefaultLayout from '@layouts/Default.layout';
import { getStaticPaths, makeStaticProps } from '@lib/getStatic';
import { Container, Content, TacBox, Title } from '@styles/tac.style';

interface TermsAndConditionsProps {
  locale: string
}

const TermsAndConditions = ({ locale }: TermsAndConditionsProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  return (
    <>
      <Head>
        <title>Cryptodistrict | {t('pages:tac.title')}</title>
      </Head>
      <DefaultLayout locale={locale} translate={t}>
        <Container>
          <TacBox>
            <Title>Lorem ipsum dolor sit amet.</Title>
            <Content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at atque commodi consectetur, dignissimos enim eveniet natus neque odit quo repudiandae vitae voluptate, voluptatem? Beatae, hic in nemo nesciunt similique totam. Accusamus aspernatur assumenda at corporis, debitis dolore dolorum eaque, enim error esse explicabo facilis id maxime necessitatibus nobis, nostrum possimus quo reprehenderit saepe sit soluta temporibus unde vel? Accusantium amet consectetur consequatur et eveniet excepturi illum nihil quaerat recusandae repellat! Aliquid assumenda aut dicta doloribus fuga illum in libero molestiae nam natus quos, vel velit, vitae. Dolore doloremque enim excepturi hic, laudantium, libero natus omnis quibusdam rerum, sint veniam!</Content>
          </TacBox>
          <TacBox>
            <Title>Lorem ipsum dolor.</Title>
            <Content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur deserunt dolorum eius eligendi esse exercitationem explicabo inventore iure iusto nobis obcaecati odio officia pariatur perspiciatis placeat possimus praesentium, quo tempora totam voluptatem! Ab deserunt dolores, est explicabo harum illo, laboriosam maiores maxime minus officiis perferendis placeat porro quam quisquam reprehenderit repudiandae sunt veniam voluptas! Assumenda iure labore laboriosam non perferendis quis sed. Ab aspernatur deleniti distinctio, enim est facilis harum ipsum modi mollitia porro sunt temporibus ullam, vero? Aliquam aspernatur commodi cupiditate harum laborum perspiciatis possimus quisquam sed, voluptates voluptatum? Aspernatur at blanditiis cupiditate doloremque est excepturi, nam qui tempore temporibus vitae? A ad aut beatae commodi consequuntur cumque dolorem doloribus ea eum exercitationem expedita harum illo illum, ipsum iure iusto maiores modi nam necessitatibus nemo nobis nulla numquam obcaecati officia pariatur placeat porro praesentium provident quae, qui repellat reprehenderit rerum, similique sunt temporibus ut veritatis? A assumenda dolor, ex neque nobis pariatur repellendus tempora? Maxime, sed tempora. Accusamus amet aperiam aut blanditiis, consequatur dignissimos eaque esse est exercitationem facere labore maiores nemo nesciunt obcaecati odit omnis, perferendis, tempora veniam vero voluptate. Earum facere placeat quisquam reprehenderit sed tempore unde? A ab accusamus accusantium animi asperiores aut deleniti dolorum, eaque earum expedita facilis fugiat hic illo in itaque minima necessitatibus nisi officiis omnis, placeat quasi quod reiciendis, rerum soluta sunt veniam voluptatum. Officia, quidem, sint? Ad alias atque cupiditate distinctio esse fugiat, iure iusto pariatur sapiente veritatis. Adipisci natus provident sint? Adipisci explicabo libero molestias officiis sapiente? Accusantium assumenda consectetur deserunt, eaque earum eos est harum iste laudantium maxime necessitatibus praesentium quaerat reprehenderit, sint vel veritatis vitae. Dolor error officiis quas saepe unde! Ab accusantium aspernatur atque autem consequatur distinctio, dolores ea enim est et facilis harum hic ipsum magnam natus neque nesciunt nihil omnis pariatur placeat porro possimus praesentium quasi quidem quos recusandae repellat reprehenderit saepe sapiente sequi suscipit tempora vel, vitae? Minima reprehenderit unde voluptate voluptates. Autem culpa distinctio dolorem ea eligendi expedita explicabo ipsa labore obcaecati recusandae sit, suscipit voluptate voluptatibus! Animi, aspernatur beatae cupiditate eaque eius excepturi fuga in ipsa iusto labore laborum libero magnam nisi non nostrum nulla, optio ratione repellat veniam voluptatum. A asperiores aspernatur aut beatae culpa cumque dolor dolorem doloribus dolorum enim esse eveniet id in, incidunt ipsam iste laborum maiores minus nemo neque nihil nostrum nulla odit omnis optio perferendis quo reprehenderit saepe sequi sint ullam unde voluptatibus, voluptatum! Dolor, id!</Content>
          </TacBox>
          <TacBox>
            <Title>Lorem ipsum dolor sit.</Title>
            <Content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur eaque est eum facere in non voluptates! Ad autem cupiditate harum in iste magni maxime mollitia odio quae quaerat, rerum, sapiente soluta ut? At esse ex illo incidunt nisi odit porro quia repudiandae sunt. Ad aliquam architecto atque corporis fugiat id inventore laborum maxime nostrum, perferendis, quasi qui repellendus vel velit voluptas. Assumenda consequatur dolore harum similique soluta. Aliquam, aperiam autem, consectetur doloremque fuga id in inventore labore magni molestiae, mollitia nihil omnis placeat porro quae rerum similique voluptatum! Ab aliquam amet animi at atque consequuntur debitis deleniti dolore doloribus dolorum earum eligendi, enim, error et eveniet ex excepturi exercitationem facere fuga incidunt iure libero maiores minima modi molestiae nihil obcaecati odio officia placeat porro possimus praesentium quasi quidem reiciendis sed vero voluptates! Adipisci deserunt eaque hic officiis soluta! Accusamus eius error inventore ipsam iure labore neque quasi reprehenderit! Asperiores aspernatur assumenda aut, blanditiis dicta dignissimos dolore eius eveniet exercitationem explicabo fugiat fugit id, ipsa ipsum magni modi molestias necessitatibus nemo nisi officiis perferendis perspiciatis possimus quae repellendus reprehenderit sed sit, tempore totam velit voluptas voluptate voluptates voluptatibus voluptatum. Earum error fugiat nemo nisi quas saepe tempora? Autem dolor, nostrum?</Content>
          </TacBox>
        </Container>
      </DefaultLayout>
    </>
  );
};

const getStaticProps = makeStaticProps(['pages', 'components', 'errors']);
export { getStaticPaths, getStaticProps };

export default TermsAndConditions;
