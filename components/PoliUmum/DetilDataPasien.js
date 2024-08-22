const DetilDataPasien=({pilihPasien})=>{
    return(
      <table>
        <tr>
          <td>
            <p className='fw-medium'>Nama pasien</p>
          </td>
          <td>
            <p className='fw-medium'>:</p>
          </td>
          <td>
            <p className='fw-medium'>{pilihPasien.nama_lengkap}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p className='fw-medium'>NIK</p>
          </td>
          <td>
            <p className='fw-medium'>:</p>
          </td>
          <td>
            <p className='fw-medium'>{pilihPasien.NIK}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p className='fw-medium'>Alamat</p>
          </td>
          <td>
            <p className='fw-medium'>:</p>
          </td>
          <td>
            <p className='fw-medium'>{pilihPasien.alamat_lengkap}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p className='fw-medium'>Jenis Kelamin</p>
          </td>
          <td>
            <p className='fw-medium'>:</p>
          </td>
          <td>
            <p className='fw-medium'>{pilihPasien.jenis_kelamin}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p className='fw-medium'>Status Pernikahan</p>
          </td>
          <td>
            <p className='fw-medium'>:</p>
          </td>
          <td>
            <p className='fw-medium'>{pilihPasien.status_pernikahan}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p className='fw-medium'>Jumlah Anak</p>
          </td>
          <td>
            <p className='fw-medium'>:</p>
          </td>
          <td>
            <p className='fw-medium'>{pilihPasien.jumlah_anak}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p className='fw-medium'>Keluhan</p>
          </td>
          <td>
            <p className='fw-medium'>:</p>
          </td>
          <td>
            <p className='fw-medium'>{pilihPasien.keluhan_utama}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p className='fw-medium'>Riwayat Penyakit Sebelumnya</p>
          </td>
          <td>
            <p className='fw-medium'>:</p>
          </td>
          <td>
            <p className='fw-medium'>{pilihPasien.riwayat_penyakit_sebelumnya}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p className='fw-medium'>Riwayat Alergi</p>
          </td>
          <td>
            <p className='fw-medium'>:</p>
          </td>
          <td>
            <p className='fw-medium'>{pilihPasien.riwayat_alergi}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p className='fw-medium'>Riwayat Pengobatan Operasui</p>
          </td>
          <td>
            <p className='fw-medium'>:</p>
          </td>
          <td>
            <p className='fw-medium'>{pilihPasien.riwayat_pengobatan_operasi}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p className='fw-medium'>Riwayat Penyakit Keluarga</p>
          </td>
          <td>
            <p className='fw-medium'>:</p>
          </td>
          <td>
            <p className='fw-medium'>{pilihPasien.riwayat_penyakit_keluarga}</p>
          </td>
        </tr>
    </table>
    )
}
export default DetilDataPasien