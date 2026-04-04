import CustomCssInjector from '@/components/admin/CustomCssInjector';

export const metadata = {
  title: 'Custom CSS Injector | Admin',
};

export default function CustomCssPage() {
  return (
    <div className="w-[98%] lg:w-[95%] xl:w-[92%] mx-auto pb-28 pt-8 space-y-6 px-4">
      <CustomCssInjector />
    </div>
  );
}
