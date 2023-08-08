import data from './players';

const getPlayers = () => {
    const getAge = (dateString) => {
        dateString =new Date(dateString)
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };
      
    return Promise.resolve(
        data
            .sort((a, b) => {
                const aPoints = a.points ?? 0;
                const bPoints = b.points ?? 0;

                return aPoints === bPoints
                    ? 0
                    : bPoints > aPoints
                        ? 1
                        : -1;
            })
            .map((it, index) => (
                {
                rank: index + 1,
                Age:getAge(it.dob),
                ...it,
            }))
    );
};

export default getPlayers;