import { useMaintenanceContext } from '@/context/MaintenanceRecordsContext';
import { cls } from '@/styles/classes';
import { GarageForm } from './GarageForm';
import { GarageList } from './GarageList';

export function GaragePage() {
  const { cars, addCar, removeCar } = useMaintenanceContext();

  return (
    <div className={cls.page}>
      <div className={cls.pageShell}>
        <header className="mb-8">
          <h1 className={cls.pageTitle}>My Garage</h1>
          <p className={cls.pageSubtitle}>Add, review, and manage your vehicles.</p>
        </header>

        <GarageForm onAddCar={addCar} />
        <GarageList cars={cars} onRemove={removeCar} />
      </div>
    </div>
  );
}
