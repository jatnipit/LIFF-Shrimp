export const useGeolocation = () => {
  const location = ref(null);
  const address = ref('');
  const loading = ref(false);
  const error = ref('');

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      error.value = 'เบราว์เซอร์ไม่รองรับการหาตำแหน่ง';
      return;
    }

    loading.value = true;
    error.value = '';

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        location.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        loading.value = false;
        getAddressFromCoordinates(location.value.lat, location.value.lng);
      },
      (err) => {
        loading.value = false;
        switch(err.code) {
          case err.PERMISSION_DENIED:
            error.value = 'การเข้าถึงตำแหน่งถูกปฏิเสธ';
            break;
          case err.POSITION_UNAVAILABLE:
            error.value = 'ไม่สามารถหาตำแหน่งได้';
            break;
          case err.TIMEOUT:
            error.value = 'หมดเวลาการค้นหาตำแหน่ง';
            break;
          default:
            error.value = 'เกิดข้อผิดพลาดในการหาตำแหน่ง';
            break;
        }
      },
      options
    );
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=th`
      );
      const data = await response.json();
      address.value = data.display_name || 'ไม่สามารถหาที่อยู่ได้';
    } catch (err) {
      console.error('Error getting address:', err);
      address.value = 'ไม่สามารถหาที่อยู่ได้';
    }
  };

  return {
    location: readonly(location),
    address: readonly(address),
    loading: readonly(loading),
    error: readonly(error),
    getCurrentLocation
  };
};