const schoolSystem = {
  danhSachHS: [],
  tongSoHS: 0,
  khoiTaoDanhSach(ds = []) {
    this.danhSachHS = [...ds];
    this.tongSoHS = ds.length;
  },
  them(dsHocSinh = []) {
    for (let hs of dsHocSinh) {
      const nam = new Date().getFullYear();
      const soThuTu = String(this.tongSoHS + 1).padStart(3, "0");
      const maHS = `ma${nam}${soThuTu}`;

      this.danhSachHS.push({
        maHS: maHS,
        hoTen: hs.hoTen,
        lopHoc: hs.lopHoc,
        diemTB: Number(hs.diemTB || 0),
        hanhKiem: hs.hanhKiem || "Chưa có",
      });

      this.tongSoHS++;
    }
  },
  timTheoMa(maHS) {
    return this.danhSachHS.find((hs) => hs.maHS === maHS) || null;
  },
  capNhat(maHS, thongTinMoi = {}) {
    const hs = this.timTheoMa(maHS);
    if (!hs) return false;

    for (let key in thongTinMoi) {
      if (key !== "maHS" && hs.hasOwnProperty(key)) {
        hs[key] = thongTinMoi[key];
      }
    }
    return true;
  },
  xoa(maHS) {
    const doDaiCu = this.danhSachHS.length;
    this.danhSachHS = this.danhSachHS.filter((hs) => hs.maHS !== maHS);
    return this.danhSachHS.length < doDaiCu;
  },
  layTheoLop(lop) {
    return this.danhSachHS.filter((hs) => hs.lopHoc === lop);
  },
  thongKe() {
    return {
      xuatSac: this.danhSachHS.filter((hs) => hs.diemTB >= 9),
      gioi: this.danhSachHS.filter((hs) => hs.diemTB >= 8 && hs.diemTB < 9),
      kha: this.danhSachHS.filter((hs) => hs.diemTB >= 6.5 && hs.diemTB < 8),
      trungBinh: this.danhSachHS.filter(
        (hs) => hs.diemTB >= 5 && hs.diemTB < 6.5
      ),
      kem: this.danhSachHS.filter((hs) => hs.diemTB < 5),
    };
  },
  sapXep(kieu = "tang") {
    const dsMoi = [...this.danhSachHS];
    return dsMoi.sort((a, b) =>
      kieu === "giam" ? b.diemTB - a.diemTB : a.diemTB - b.diemTB
    );
  },
};
